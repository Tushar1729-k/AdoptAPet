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

def setup_module(module):
    print("starting setup_module")
    global driver, wait

    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    driver = Remote("http://selenium__standalone-chrome:4444/wd/hub", desired_capabilities=chrome_options.to_capabilities())
    driver.get(url)
    wait = WebDriverWait(driver, 20)
    return driver
 
def teardown_module(module):
    print("starting teardown_module")
    driver.close()

def test_title():
    print("starting test_title")
    assert driver.title # 1

def test_navbar_home():
    print("starting test_navbar_home")
    home = driver.find_elements(By.LINK_TEXT, "Home")
    assert driver.current_url == url
