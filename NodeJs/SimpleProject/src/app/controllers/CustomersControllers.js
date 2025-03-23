let customers = [
  { id: 1, name: "John Doe", email: "abc@d.com" },
  { id: 2, name: "Jane Doe", email: "ab@d.com" },
];
class CustomersControllers {
  constructor() {}

  index(req, res) {
    return res.json(customers);
  }
  show(req, res) {
    const id = parseInt(req.params.id);
    const currentCustomer = customers.find(
      (thisCustomer) => thisCustomer.id == id
    );
    console.log(req.params);
    const status = currentCustomer ? 200 : 404;
    return res.status(status).json(currentCustomer);
  }
  create(req, res) {
    const { name, email } = req.body;
    const id = customers[customers.length - 1].id + 1;

    const newCustomer = { id, name, email };

    customers.push(newCustomer);
    return res.status(201).json(newCustomer);
  }
  update(req, res) {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const customer = customers.find((customer) => customer.id == id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    customer.name = name;
    customer.email = email;
    return res.json(customer);
  }
  destroy(req, res) {
    console.log("try to delete");
    const id = parseInt(req.params.id);
    const customerIndex = customers.findIndex((customer) => customer.id == id);
    if (customerIndex === -1) {
      return res.status(404).json({ error: "Customer not found" });
    }
    customers.splice(customerIndex, 1);
    return res.status(204).json();
  }
}

export default new CustomersControllers();
