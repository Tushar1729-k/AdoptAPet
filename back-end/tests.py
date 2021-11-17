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
        req = test_client.get("/ap/1019366")
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
        req = test_client.get("/ac/12")
        self.assertEqual(req.status_code, 200)

    def test_search(self):
        test_client = app.test_client()
        req = test_client.get("/search")
        self.assertEqual(req.status_code, 200)

    # searching by pet sex
    def search_pets(self):
        test_client = app.test_client()
        r = test_client.get("/ap?q=female")
        data = r.json
        self.assertEqual(data["count"], 204)

    # searching by pet age
    def search_pets_2(self):
        test_client = app.test_client()
        r = test_client.get("/ap?q=adult")
        data = r.json
        self.assertEqual(data["count"], 137)

    # searching by center name
    def search_center_1(self):
        test_client = app.test_client()
        r = test_client.get("/ac?q=Cat Rescue of Maryland, Inc.")
        data = r.json
        self.assertEqual(data["count"], 88)

    # searching by city and center name
    def search_center_2(self):
        test_client = app.test_client()
        r = test_client.get("/ac?q=Baltimore Animal Relief Fund")
        data = r.json
        self.assertEqual(data["count"], 30)

    # searching by breed name
    def search_center_1(self):
        test_client = app.test_client()
        r = test_client.get("/sb?q=calico")
        data = r.json
        self.assertEqual(data["count"], 30)

    # filtering by pet breeds
    def filter_pets(self):
        test_client = app.test_client()
        r = test_client.get("/ap?breed=beagle")
        data = r.json
        self.assertEqual(data["count"], 430)

    # filtering by pet color
    def filter_pets_2(self):
        test_client = app.test_client()
        r = test_client.get("/ap?color=white")
        data = r.json
        self.assertEqual(data["count"], 1)

    # filtering by center city
    def filter_center(self):
        test_client = app.test_client()
        r = test_client.get("/ac?city=baltimore")
        data = r.json
        self.assertEqual(data["count"], 1)

    # filtering by center state
    def filter_center_2(self):
        test_client = app.test_client()
        r = test_client.get("/ac?state=md")
        data = r.json
        self.assertEqual(data["count"], 7)

    # sorting by breeds
    def test_sort_breeds(self):
        test_client = app.test_client()
        r = test_client.get("/sb?sort=species")
        data = r.json
        self.assertEqual(data["count"], 368)
        self.assertEqual(data["page"][0]["species_name"], "Cat")
        r = test_client.get("/sb?sort=-species")
        data = r.json
        self.assertEqual(data["page"][0]["species_name"], "Dog")

    # sorting by invalid parameter for breeds
    def test_sort_breeds_2(self):
        test_client = app.test_client()
        r = test_client.get("/sb?sort=species")
        data = r.json
        self.assertEqual(data["page"][0]["id"], 6)


if __name__ == "__main__":
    main()
