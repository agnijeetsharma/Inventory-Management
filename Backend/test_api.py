import requests

BASE_URL = "http://localhost:8080/api/v1"

def print_result(test_name, passed, expected=None, got=None, request_data=None, response_body=None):
    if passed:
        print(f"{test_name}: ✅ PASSED")
    else:
        print(f"{test_name}: ❌ FAILED")
        if request_data:
            print(f"  Request: {request_data}")
        if expected is not None and got is not None:
            print(f"  Expected: {expected}, Got: {got}")
        if response_body:
            print(f"  Response Body: {response_body}")

def test_register_user():
    payload = {"username": "puja", "password": "mypassword"}  # add email if required by backend
    res = requests.post(f"{BASE_URL}/auth/register", json=payload)
    passed = res.status_code in [201, 409]
    print_result("User Registration", passed, "201 or 409", res.status_code, payload, res.text)

def test_login():
    payload = {"username": "puja", "password": "mypassword"}
    res = requests.post(f"{BASE_URL}/auth/login", json=payload)
    token = None
    passed = False
    if res.status_code == 200:
        try:
            token = res.json().get("access_token")
            passed = token is not None
        except Exception:
            passed = False
    print_result("Login Test", passed, 200, res.status_code, payload, res.text)
    return token

def test_add_product(token):
    payload = {
        "name": "Phone",
        "type": "Electronics",
        "sku": "PHN-001",
        "image_url": "https://example.com/phone.jpg",
        "description": "Latest Phone Model",
        "quantity": 5,
        "price": 999.99
    }
    res = requests.post(
        f"{BASE_URL}/products",
        json=payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    passed = res.status_code == 201
    print_result("Add Product", passed, 201, res.status_code, payload, res.text)
    if passed:
        return res.json().get("product_id")
    return None

def test_update_quantity(token, product_id, new_quantity):
    payload = {"quantity": new_quantity}
    res = requests.put(
        f"{BASE_URL}/products/{product_id}/quantity",
        json=payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    passed = res.status_code == 200
    print_result("Update Quantity", passed, 200, res.status_code, payload, res.text)

def test_get_products(token, expected_quantity):
    res = requests.get(f"{BASE_URL}/products", headers={"Authorization": f"Bearer {token}"})
    if res.status_code != 200:
        print_result("Get Products", False, 200, res.status_code, None, res.text)
        return

    try:
        products = res.json().get("products", res.json())
    except Exception:
        print_result("Get Products", False, "valid JSON", "Invalid JSON", None, res.text)
        return

    phone_products = [p for p in products if p.get("name") == "Phone"]
    if not phone_products:
        print("Get Products: ❌ FAILED - Product not found")
        return

    phone_quantity = phone_products[0].get("quantity")
    passed = phone_quantity == expected_quantity
    print_result("Get Products", passed, expected_quantity, phone_quantity, None, products)

def run_all_tests():
    test_register_user()
    token = test_login()
    if not token:
        print("Login failed. Skipping further tests.")
        return

    product_id = test_add_product(token)
    if not product_id:
        print("Product creation failed. Skipping further tests.")
        return

    new_quantity = 15
    test_update_quantity(token, product_id, new_quantity)
    test_get_products(token, expected_quantity=new_quantity)

if __name__ == "__main__":
    run_all_tests()
