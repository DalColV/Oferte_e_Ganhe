import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
import sys

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

def export_store_data(store_id):
    try:
        connection_string = f"postgresql+psycopg2://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
        engine = create_engine(connection_string)

        queries = {
            "store": """
                SELECT 
                    s.store_id,
                    s.store_name,
                    s.street,
                    s.cep,
                    s.number
                FROM store s
                WHERE s.store_id = %s;  -- Filtro correto por store_id
            """,
            "inventory": """
                SELECT 
                    i.inventory_id,
                    i.store_id,
                    i.min_quantity,
                    i.recommended_quantity,
                    i.current_quantity
                FROM inventory i
                WHERE i.store_id = %s;  
            """,
            "users": """
                SELECT 
                    u.registration,
                    u.username,
                    u.email,
                    u.profile_id
                FROM users u
                WHERE u.store_id = %s;  
            """,
            "talon_logs": """
                SELECT 
                    tl.talon_id,
                    tl.shipment,
                    tl.inventory_id,
                    tl.talon_quantity,
                    tl.send_date,
                    tl.talon_status,
                    tl.receive_date,
                    tl.registration,
                    tl.order_date
                FROM talon_logs tl
                JOIN inventory i ON tl.inventory_id = i.inventory_id
                WHERE i.store_id = %s;  
            """
        }

        # Caminho salvar o relatório
        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))
        reports_folder = os.path.join(project_root, 'relatorios')
        os.makedirs(reports_folder, exist_ok=True)

        # D caminho do  CSV
        csv_path = os.path.join(reports_folder, f'loja_{store_id}.csv')

        with open(csv_path, 'w', encoding='utf-8') as csvfile:
            for sheet_name, query in queries.items():
                print(f"Executando query para a aba '{sheet_name}'...")

                df = pd.read_sql_query(query, engine, params=(store_id,))

                df.to_csv(csvfile, index=False, header=True, mode='a', encoding='utf-8', sep=';')

        print(f"Relatório exportado com sucesso: {csv_path}")
        print("STATUS: SUCCESS")
        sys.exit(0)

    except Exception as e:
        print(f"Erro ao exportar relatório: {e}")
        print("STATUS: ERROR")
        sys.exit(1)

if __name__ == '__main__':
    # Captura o argumento store_id da linha de comando
    if len(sys.argv) < 2:
        print("Erro: O argumento 'store_id' é obrigatório.")
        print("STATUS: ERROR")
        sys.exit(1)

    store_id = sys.argv[1]
    export_store_data(store_id)
