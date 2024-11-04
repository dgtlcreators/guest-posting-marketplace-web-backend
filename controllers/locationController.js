
const fetch = require("node-fetch");



const username = "roja1";

module.exports.countryApi = async (req, res) => {
    try {
        const response = await fetch(`http://api.geonames.org/countryInfoJSON?username=${username}`);
        const data = await response.json();

        if (data.geonames) {
            res.status(200).json({ countries: data.geonames });
        } else {
            res.status(404).json({ message: "No country data found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  

module.exports.stateApi = async (req, res) => {
    const { countryCode } = req.body;

    if (!countryCode) {
        return res.status(400).json({ error: "Country code is required" });
    }

    try {
        const response = await fetch(`http://api.geonames.org/searchJSON?country=${countryCode}&featureCode=ADM1&username=${username}`);
        const data = await response.json();

        if (data.geonames) {
            res.status(200).json({ states: data.geonames });
        } else {
            res.status(404).json({ message: "No state data found for this country" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

  

module.exports.cityApi = async (req, res) => {
    const { countryCode, stateCode } = req.body;

    if (!countryCode || !stateCode) {
        return res.status(400).json({ error: "Country code and state code are required" });
    }

    try {
        const response = await fetch(`http://api.geonames.org/searchJSON?country=${countryCode}&adminCode1=${stateCode}&featureCode=PPL&username=${username}`);
        const data = await response.json();

        if (data.geonames) {
            res.status(200).json({ cities: data.geonames });
        } else {
            res.status(404).json({ message: "No city data found for this state" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
