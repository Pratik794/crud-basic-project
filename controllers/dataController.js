const Data = require('../models/dataModel');

const getAllData = async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// controllers/dataController.js

// const saveData = async (req, res) => {
//   try {
//     const newData = req.body; // Assuming req.body is an array of objects
//     const chunkSize = 100; // Set your desired chunk size

//     for (let i = 0; i < newData.length; i += chunkSize) {
//       const chunk = newData.slice(i, i + chunkSize);
//       await Data.insertMany(chunk);
//     }

//     res.status(201).json({ message: 'Data saved successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
const saveData = async (req, res) => {
  try {
    const dataArray = req.body;

    // Use streaming to process each object in the array
    const stream = Data.collection.initializeUnorderedBulkOp();
    
    dataArray.forEach((dataObject) => {
      stream.insert(dataObject);
    });

    // Execute the bulk insert operation
    await stream.execute();

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Implement other CRUD operations here

module.exports = { getAllData,saveData };
