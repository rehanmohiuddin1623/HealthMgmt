const { Data } =require ("../models/data");


const getLatestData = async (req, res) => {
    try {
      const { user_id } = req.query
      const latest_data = await Data.findOne({ ref_user: user_id }).lean()
      res.status(200).send({
        message: latest_data
      })
    }
    catch (e) {
      res.status(500).send({
        message: e.toString(),
      });
    }
  }
  
  const getPatientHistory = async (req, res) => {
    try {
      const { user_id, doctor_id, size = "10", pageNo = "1" } = req.query
      const { page_no, page_size } = { page_no: parseInt(pageNo), page_size: parseInt(size) }
      const latest_data_list = await Data.find({ ref_user: user_id, ref_doctor: doctor_id }).sort("-date").skip(page_no * page_size).limit(page_size).lean()
      res.status(200).send({
        message: latest_data_list
      })
    }
    catch (e) {
      res.status(500).send({
        message: e.toString(),
      });
    }
  }

  module.exports = {
    getLatestData,
    getPatientHistory
  }