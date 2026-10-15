# Teslinha Suporte — Identidade visual

Materiais institucionais e peças de divulgação da Teslinha Suporte, empresa de tecnologia com atuação em desenvolvimento de sistemas, sites, aplicativos, automações e assistência técnica.

## Estrutura

```text
.
├── assets/
│   ├── logo/       # Logos em PNG e PDF vetorial
│   └── marketing/  # Artes prontas para divulgação
├── .agents/
│   └── skills/teslinha-suporte/ # Convenções do projeto para o Codex
├── docs/
│   └── empresa.md  # Perfil institucional e escopo de serviços
├── .env            # Credenciais locais; não versionado
└── README.md
```

## Identidade visual

A identidade combina azul intenso, azul claro, branco e fundo escuro. A logo associa uma lâmpada, um notebook e um movimento ascendente, representando inovação, tecnologia e suporte.

Paleta de referência:

| Papel | Cor |
| --- | --- |
| Fundo escuro | `#050B1A` |
| Superfície | `#101B36` |
| Azul principal | `#075BFF` |
| Azul claro | `#55B8FF` |
| Texto claro | `#FFFFFF` |

## Arte disponível

- [Post minimalista — desenvolvimento de sistemas](assets/marketing/teslinha-desenvolvimento-sistemas-instagram-v2.png)
- [Primeira versão do post](assets/marketing/teslinha-desenvolvimento-sistemas-instagram.png)

## Perfil da empresa

O escopo institucional completo está em [docs/empresa.md](docs/empresa.md). Ele descreve os serviços, públicos atendidos, área de atuação e limites das informações disponíveis.

## Segurança

Credenciais e tokens locais devem ficar no arquivo `.env`, que é ignorado pelo Git. Nunca publique esse arquivo, coloque segredos no README ou envie tokens em commits. Se uma credencial for exposta, revogue-a e gere outra no Meta antes de utilizá-la.

## Skill do projeto

As tarefas relacionadas a este repositório usam a skill local em `.agents/skills/teslinha-suporte/SKILL.md`. Ela centraliza as convenções da marca e, para novas imagens geradas, usa nomes com data, hora, descrição e versão:

```text
YYYY-MM-DD_HH-mm-ss_descricao-curta_vNN.ext
```

Exemplo: `2026-10-15_18-30-00_desenvolvimento-sistemas_v01.png`.

## Publicação no Instagram

A publicação via API do Instagram exige uma conta profissional, um token válido com as permissões necessárias e uma URL pública para a imagem. O arquivo local não é enviado diretamente pela API; a URL precisa ser acessível pelos servidores do Meta.
