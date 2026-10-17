import csv
import json
import tempfile
import unittest
from pathlib import Path

from src.gerar_emails import gerar_emails


class CliTest(unittest.TestCase):
    def test_gera_um_html_por_contato_autorizado_e_relatorio(self):
        pasta = tempfile.TemporaryDirectory()
        self.addCleanup(pasta.cleanup)
        raiz = Path(pasta.name)
        entrada = raiz / "contatos.csv"
        saida = raiz / "saida"
        with entrada.open("w", newline="", encoding="utf-8") as arquivo:
            escritor = csv.DictWriter(arquivo, fieldnames=["nome_contato", "empresa", "nicho", "email", "autorizou_marketing"])
            escritor.writeheader()
            escritor.writerows([
                {"nome_contato": "Ana", "empresa": "Imóveis Sol", "nicho": "imobiliária", "email": "ana@example.com", "autorizou_marketing": "sim"},
                {"nome_contato": "Bruno", "empresa": "Corte Bom", "nicho": "barbearia", "email": "bruno@example.com", "autorizou_marketing": "não"},
            ])

        relatorio = gerar_emails(entrada, saida)

        htmls = list(saida.glob("*.html"))
        self.assertEqual(len(htmls), 1)
        self.assertIn("Ana", htmls[0].read_text(encoding="utf-8"))
        salvo = json.loads((saida / "relatorio.json").read_text(encoding="utf-8"))
        self.assertEqual(salvo["processados"], 1)
        self.assertEqual(len(salvo["ignorados"]), 1)
        self.assertEqual(relatorio["arquivos"][0], str(htmls[0]))


if __name__ == "__main__":
    unittest.main()
