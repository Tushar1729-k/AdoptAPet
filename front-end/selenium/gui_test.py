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

# 1
def test_title():
    print("starting test_title")
    assert driver.title

# 2
def test_navbar_home():
    print("starting test_navbar_home")
    home = driver.find_element(By.LINK_TEXT, "Home")
    home.click()
    assert driver.current_url == "https://www.adoptapet.me/"

# 3
def test_navbar_about():
    print("starting test_navbar_about")
    about = driver.find_element(By.LINK_TEXT, "About")
    about.click()
    assert driver.current_url == "https://www.adoptapet.me/about"

# 4
def test_navbar_species():
    print("starting test_navbar_sbmodel")
    species = driver.find_element(By.LINK_TEXT, "Species")
    species.click()
    assert driver.current_url == "https://www.adoptapet.me/sbmodel"

# 5
def test_navbar_pets():
    print("starting test_navbar_apmodel")
    pets = driver.find_element(By.LINK_TEXT, "Pets")
    pets.click()
    assert driver.current_url == "https://www.adoptapet.me/apmodel"

# 6
def test_navbar_adoption_centers():
    print("starting test_navbar_adoption_centers")
    centers = driver.find_element(By.LINK_TEXT, "Adoption Centers")
    centers.click()
    assert driver.current_url == "https://www.adoptapet.me/acmodel"

# 7
def test_navbar_logo():
    print("starting test_navbar_logo")
    logo = driver.find_element(By.LINK_TEXT, "Adopt a Pet")
    logo.click()
    assert driver.current_url == "https://www.adoptapet.me/"

# 8
def test_home_h1():
    print("starting test_home_h1")
    elem = driver.find_element(By.TAG_NAME, "h1")
    assert elem.text == "Give a home to these animals"
