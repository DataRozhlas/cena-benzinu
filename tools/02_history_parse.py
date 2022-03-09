# %%
import pandas as pd
import os
import json
# %%
out = []

states = [
    'Austria',
    'Germany',
    'Czech Republic',
    'Czechia',
    'Hungary',
    'Slovakia',
    'Poland',
]

for rep in os.listdir('../scratch/'):
    print(rep)
    d = pd.read_excel('../scratch/' + rep)
    for state in list(d.to_dict(orient='index').values()):
        if (state['Country Name'] in states) & (state['Product Name'] == 'Euro-super 95'):
            dte = int(state['Prices in force on'].timestamp())
            val = round(float(str(state['Weekly price with taxes']).replace(',', '')) / 1000, 3)
            out.append([state['Country Name'].replace('Czech Republic', 'Czechia'), dte, val])
# %%
# %%
o = {}
for r in out:
    if r[0] not in o:
        o[r[0]] = []
    o[r[0]].append([r[1], r[2]])

with open('../n95_price.json', 'w') as f:
    f.write(json.dumps(o))
# %%
