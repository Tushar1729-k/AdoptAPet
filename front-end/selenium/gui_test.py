import pytest
from selenium import webdriver
from selenium.webdriver import Remote
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

driver = None
wait = None

url = "https://adoptapet.me"
PATH = "./frontend/guitests/chromedriver"

def setup_modele(module):
    global driver, wait

    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    driver = Remote("http://selenium__standalone-chrome:4444/wd/hub", desired_capabilities=chrome_options.to_capabilities())
    driver.get(url)
    wait = WebDriverWait(driver, 20)
    return driver
 
def teardown_module(module):
    driver.close()

def test_title():
    assert driver.title
