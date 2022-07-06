const express = require("express");
const mongoose = require('mongoose');
const dotenv=require('dotenv')
const bodyParser = require("body-parser");



const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 

dotenv.config()
mongoose.connect(process.env.MONGO_DB_URL,{
useNewUrlParser: true,
})
.then(()=>{
  console.log(`mongo Db has been connected sucessfully!1`);
})
.catch((err)=>{
  console.log(err)
  console.error(`mongo Db connected failed .....`);
})

var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

//ObjectID is a unique identifier for every document created in mongoDB. We’ll need this to link every item created with the user that created it.
const ObjectID = mongoose.Schema.Types.ObjectId;
///////////////////////////////////////////////////////////////////////////////////////////////////////////

///////Mongodb Schema///////

///////////////////////////////////////////////////////////////////////////////////////////////////////////

////// items
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    product_type: {
      type: String,
      required: true,
    },
    product_img: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Item = mongoose.model("Item", itemSchema);


//////Cart
const cartSchema = new mongoose.Schema(
  {
    items: [
      {
        itemId: {
          type: ObjectID,
          ref: "Item",
          required: true,
        },
        name: String,
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        product_img: String,
        price: Number,
      },
    ],
    bill: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// API
///////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/items", async (req, res) => {
  try {
    const newItem = new Item({
      ...req.body,
    });
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(400).send({ message: "error" });
  }
});

app.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });
    if (!item) {
      res.status(404).send({ error: "Item not found" });
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/items", async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error);
  }
});

//-----------------//
app.get("/cart", async (req, res) => {
  try {
    const cart = await Cart.find({});
    if (cart && cart.length > 0) {
      res.status(200).send(cart);
    } else {
      res.send(null);
    }
  } catch (error) {
    res.status(500).send();
  }
});

app.post("/cart", async (req, res) => {
  const { itemId, quantity } = req.body;
  const items = await Item.find({});
  try {
    const cart = await Cart.find({});
    const item = await Item.findOne({ _id: itemId });

    if (!item) {
      res.status(404).send({ message: "item not found" });
      return;
    }
    const price = item.price;
    const name = item.name;
    const product_img = item.product_img[0];
    
    //If cart already exists for user,
    if (cart) {
      if (cart.items) {
        const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
        //check if product exists or not
        if (itemIndex > -1) {
          let product = cart.items[itemIndex];
          product.quantity += quantity;
          cart.bill = cart.items.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price;
          }, 0);
          cart.items[itemIndex] = product;
          await cart.save();
          res.status(200).send(cart);
        } else {
          cart.items.push({ itemId, name, quantity, product_img, price });
          cart.bill = cart.items.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price;
          }, 0);
          await cart.save();
          res.status(200).send(cart);
        }
      } else {
        const newCart = await Cart.create({
          items: [{ itemId, name, quantity, product_img, price }],
          bill: quantity * price,
        });
        return res.status(201).send(newCart);
      }
    } 
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

app.delete("/cart/", async (req, res) => {
  const itemId = req.query.itemId;
  try {
    let cart = await Cart.find({});
    const item = await Cart.findOne({ _id: itemId });
    if (item == null) {
      res.status(404).send({ error: "Item not found" });
    }
    else{
      const deletedcart = await item.remove();
    // const deletedcart = cart.findByIdAndRemove({ _id: itemId });//items.findIndex((item) => item.itemId == itemId);
     
   res.status(200).send(deletedcart);
    }
    
} 
catch (error) {
   res.status(400).send(error)
}
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
