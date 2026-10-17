import unittest

from src.nichos import carregar_perfis, normalizar_nicho, selecionar_perfil


class NichosTest(unittest.TestCase):
    def test_normaliza_variacoes_de_acento_e_espacos(self):
        self.assertEqual(normalizar_nicho(" Imobiliária "), "imobiliaria")
        self.assertEqual(normalizar_nicho("BARBEARIA"), "barbearia")

    def test_carrega_perfis_iniciais_e_seleciona_nicho(self):
        perfis = carregar_perfis("config/nichos.json")
        imobiliaria = selecionar_perfil("imobiliária", perfis)
        barbearia = selecionar_perfil("barbearia", perfis)

        self.assertEqual(imobiliaria["chave"], "imobiliaria")
        self.assertIn("site", imobiliaria["solucao"].lower())
        self.assertIn("agendamento", barbearia["solucao"].lower())

    def test_nicho_desconhecido_usa_perfil_padrao(self):
        perfis = carregar_perfis("config/nichos.json")
        perfil = selecionar_perfil("consultoria ambiental", perfis)
        self.assertEqual(perfil["chave"], "padrao")


if __name__ == "__main__":
    unittest.main()
