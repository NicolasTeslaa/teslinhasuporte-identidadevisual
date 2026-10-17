import csv
import tempfile
import unittest
from pathlib import Path

from openpyxl import Workbook
from src.contatos import ler_contatos


class ContatosTest(unittest.TestCase):
    def _criar_csv(self, linhas):
        pasta = tempfile.TemporaryDirectory()
        caminho = Path(pasta.name) / "contatos.csv"
        with caminho.open("w", newline="", encoding="utf-8") as arquivo:
            escritor = csv.DictWriter(arquivo, fieldnames=linhas[0].keys())
            escritor.writeheader()
            escritor.writerows(linhas)
        return pasta, caminho

    def test_separa_autorizados_e_ignora_sem_consentimento(self):
        pasta, caminho = self._criar_csv([
            {"nome_contato": "Ana", "empresa": "Imóveis Sol", "nicho": "imobiliária", "email": "ana@example.com", "autorizou_marketing": "sim"},
            {"nome_contato": "Bruno", "empresa": "Corte Bom", "nicho": "barbearia", "email": "bruno@example.com", "autorizou_marketing": "não"},
        ])
        self.addCleanup(pasta.cleanup)

        contatos, relatorio = ler_contatos(caminho)

        self.assertEqual([contato["nome_contato"] for contato in contatos], ["Ana"])
        self.assertEqual(relatorio["ignorados"][0]["motivo"], "sem_autorizacao")

    def test_rejeita_email_invalido_em_contato_autorizado(self):
        pasta, caminho = self._criar_csv([
            {"nome_contato": "Ana", "empresa": "Imóveis Sol", "nicho": "imobiliária", "email": "nao-e-email", "autorizou_marketing": "sim"},
        ])
        self.addCleanup(pasta.cleanup)

        with self.assertRaises(ValueError):
            ler_contatos(caminho)

    def test_rejeita_coluna_obrigatoria_ausente(self):
        pasta, caminho = self._criar_csv([
            {"nome_contato": "Ana", "empresa": "Imóveis Sol", "nicho": "imobiliária", "email": "ana@example.com"},
        ])
        self.addCleanup(pasta.cleanup)

        with self.assertRaises(ValueError):
            ler_contatos(caminho)

    def test_le_planilha_xlsx(self):
        pasta = tempfile.TemporaryDirectory()
        self.addCleanup(pasta.cleanup)
        caminho = Path(pasta.name) / "contatos.xlsx"
        livro = Workbook()
        folha = livro.active
        folha.append(["nome_contato", "empresa", "nicho", "email", "autorizou_marketing"])
        folha.append(["Carla", "Ateliê Central", "consultoria", "carla@example.com", "sim"])
        livro.save(caminho)

        contatos, relatorio = ler_contatos(caminho)

        self.assertEqual(contatos[0]["empresa"], "Ateliê Central")
        self.assertEqual(relatorio["processados"], 1)


if __name__ == "__main__":
    unittest.main()
