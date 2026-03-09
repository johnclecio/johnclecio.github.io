import requests
from collections import defaultdict

# Usuário GitHub
USERNAME = "johnclecio"

# 1️⃣ Pegar todos os repositórios públicos do usuário
repos_url = f"https://api.github.com/users/{USERNAME}/repos"
repos_res = requests.get(repos_url)

if repos_res.status_code != 200:
    print(f"Erro ao acessar API: {repos_res.status_code}")
    exit()

repos = repos_res.json()

# 2️⃣ Criar um dicionário para somar bytes de cada linguagem
linguagens_totais = defaultdict(int)

for repo in repos:
    linguagens_url = repo["languages_url"]  # URL para as linguagens deste repo
    ling_res = requests.get(linguagens_url)
    
    if ling_res.status_code != 200:
        print(f"Erro ao acessar linguagens do repo {repo['name']}")
        continue
    
    ling_data = ling_res.json()  # ex: {"Python": 10234, "HTML": 234}
    
    for ling, bytes_count in ling_data.items():
        linguagens_totais[ling] += bytes_count

# 3️⃣ Calcular porcentagem de cada linguagem
total_bytes = sum(linguagens_totais.values())

print("\n📊 Porcentagem de linguagens em todos os repositórios de johnclecio:\n")

for ling, bytes_count in linguagens_totais.items():
    perc = (bytes_count / total_bytes) * 100
    print(f"{ling}: {perc:.1f}%")