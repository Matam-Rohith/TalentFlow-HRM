import os
from datetime import datetime


class BasePage:
    BASE_URL = "file:///index.html"  # Update to deployed URL if available

    def __init__(self, driver):
        self.driver = driver

    def take_screenshot(self, name):
        os.makedirs("screenshots", exist_ok=True)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        path = f"screenshots/{name}_{timestamp}.png"
        self.driver.save_screenshot(path)
        return path

    def open(self, url=None):
        self.driver.get(url or self.BASE_URL)
