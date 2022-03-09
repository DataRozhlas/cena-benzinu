# %%
import requests
from bs4 import BeautifulSoup
import re
# %%
r = requests.get('https://ec.europa.eu/energy/observatory/reports/')
sp = BeautifulSoup(r.text)
# %%
for rec in sp.find_all('a', href=re.compile('raw_data')):
    fle = rec.get('href')
    with open('./scratch/' + fle, 'wb') as f:
        r = requests.get('https://ec.europa.eu/energy/observatory/reports/' + fle)
        f.write(r.content)

# %%
