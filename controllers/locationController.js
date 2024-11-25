
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
  
    const { countryCode, stateCode ,stateIsocode} = req.body;
//console.log("countryCode, stateCode ,stateIsocode",countryCode, stateCode,stateIsocode)

    if (!countryCode || !stateCode) {
        return res.status(400).json({ error: "Country code and state code are required" });
    }

    try {
        //http://api.geonames.org/children?geonameId=STATE_GEONAME_ID&username=yourusername
       // actual const response = await fetch(`http://api.geonames.org/searchJSON?country=${countryCode}&adminCode1=${stateCode}&fCode=PPLA&username=${username}`);    
 // const response = await fetch(`http://api.geonames.org/searchJSON?country=${countryCode}&adminName1=${stateCode}&maxRows=1000&username=${username}`);
const response = await fetch(`http://api.geonames.org/searchJSON?q=${stateCode}&country=IN&username=${username}`)
        const data = await response.json();
        const filteredCities = data.geonames.filter(city => {
            return city.adminCodes1 && city.adminCodes1.ISO3166_2 === stateIsocode; 
          });
      
       
        //  console.log(filteredCities);

        if (data.geonames) {
            res.status(200).json({ cities: filteredCities});
        } else {
            res.status(404).json({ message: "No city data found for this state" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
