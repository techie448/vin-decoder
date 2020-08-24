const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
module.exports  = async (req, res) => {
    const { id: VIN } = req.query;
    try {
        if(!VIN || VIN.length!==17) return res.status(400).json({
            message: "Please enter a 17 digit VIN."
        })
        const url = `https://www.carfax.ca/vin-decode?vin=${VIN}`;
        const request = await axios(url);
        const { document } = new JSDOM(request.data).window;
        const content = document.querySelector('h2').textContent.trim().split(" ");
        const response = {
            YEAR: parseInt(content[0]),
            MAKE: content[1],
            MODEL: content.slice(2).join(" ")
        }
        console.log(response)
        if (!isNaN(response.YEAR)) return res.status(200).json(response);
        return res.status(404).json({message: 'VIN not found.'});
    } catch (error) {
        console.log(error)
        return res.status(404).json({message: error.message});
    }
}
