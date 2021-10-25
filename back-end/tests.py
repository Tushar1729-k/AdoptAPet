from unittest import main, TestCase
from app import app

class UnitTests(TestCase):
    def test_ap(self):
        test_client = app.test_client()
        req = test_client.get("/ap")
        self.assertEqual(req.status_code, 200)

    def test_ap_id(self):
        test_client = app.test_client()
        req = test_client.get("/ap/1")
        self.assertEqual(req.status_code, 200)

    def test_sb(self):
        test_client = app.test_client()
        req = test_client.get("/sb")
        self.assertEqual(req.status_code, 200)

    def test_sb_id(self):
        test_client = app.test_client()
        req = test_client.get("/sb/1")
        self.assertEqual(req.status_code, 200)

    def test_ac(self):
        test_client = app.test_client()
        req = test_client.get("/ac")
        self.assertEqual(req.status_code, 200)

    def test_sb_id(self):
        test_client = app.test_client()
        req = test_client.get("/sb/1")
        self.assertEqual(req.status_code, 200)

if __name__ == "__main__":
    main()
