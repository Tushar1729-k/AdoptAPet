from unittest import main, TestCase
from app import app

class UnitTests(TestCase):
    def test_ap(self):
        test_client = app.test_client()
        req = test_client.get("/ap")
        self.assertEqual(req.status_code, 200)

    def test_ap_page(self):
        test_client = app.test_client()
        req = test_client.get("/ap?page=1")
        self.assertEqual(req.status_code, 200)

    def test_ap_perpage(self):
        test_client = app.test_client()
        req = test_client.get("/ap?perPage=1")
        self.assertEqual(req.status_code, 200)

    def test_ap_id(self):
        test_client = app.test_client()
        req = test_client.get("/ap/1")
        self.assertEqual(req.status_code, 200)

    def test_sb(self):
        test_client = app.test_client()
        req = test_client.get("/sb")
        self.assertEqual(req.status_code, 200)

    def test_sb_page(self):
        test_client = app.test_client()
        req = test_client.get("/sb?page=1")
        self.assertEqual(req.status_code, 200)

    def test_sb_perpage(self):
        test_client = app.test_client()
        req = test_client.get("/sb?perPage=1")
        self.assertEqual(req.status_code, 200)

    def test_sb_id(self):
        test_client = app.test_client()
        req = test_client.get("/sb/1")
        self.assertEqual(req.status_code, 200)

    def test_ac(self):
        test_client = app.test_client()
        req = test_client.get("/ac")
        self.assertEqual(req.status_code, 200)

    def test_ac_page(self):
        test_client = app.test_client()
        req = test_client.get("/ac?page=1")
        self.assertEqual(req.status_code, 200)

    def test_ac_perpage(self):
        test_client = app.test_client()
        req = test_client.get("/ac?perPage=1")
        self.assertEqual(req.status_code, 200)

    def test_ac_id(self):
        test_client = app.test_client()
        req = test_client.get("/ac/1")
        self.assertEqual(req.status_code, 200)

if __name__ == "__main__":
    main()
