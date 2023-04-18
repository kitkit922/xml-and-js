// Tsz Kit Cheung N01555831

const key = 'csSzfj4zi106bVFm8xkfw';

const getAuth = async (token) => {  //create token
    const result = await fetch("https://www.carboninterface.com/api/v1/auth",{
        method: "GET",
        headers: { Authorization: "Bearer " + token },
    });

    const data = await result.json();
    return data.message;
};

const getFlight = async (token, people, des1, des2) => {
    const result = await fetch("https://www.carboninterface.com/api/v1/estimates", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "flight",
        passengers: people,
        legs: [
          { departure_airport: des1, destination_airport: des2 },
        ],
      }),
    });
  
    const dat = await result.json();
    return dat.data.attributes;
  };

  const getGeneral = async (token, weight, dist, tw) => {
    const result = await fetch("https://www.carboninterface.com/api/v1/estimates", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "shipping",
        weight_value: weight,
        weight_unit: "kg",
        distance_value: dist,
        distance_unit: "km",
        transport_method: tw
      }),
    });
  
    const dat = await result.json();
    return dat.data.attributes;
  };

  const getVehMakes = async (token) => {
    const result = await fetch("https://www.carboninterface.com/api/v1/vehicle_makes", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  
    const dat = await result.json();
    return dat;
  };
  

  const getCar = async (token,makeID) => {
    const result = await fetch(`https://www.carboninterface.com/api/v1/vehicle_makes/${makeID}/vehicle_models`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  
    const dat = await result.json();
    return dat;
  };

  const getVeh = async (token, carID, dist) => {
    const result = await fetch("https://www.carboninterface.com/api/v1/estimates", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "vehicle",
        distance_unit: "km",
        distance_value: dist,
        vehicle_model_id: String(carID)
      }),
    });
  
    const dat = await result.json();
    console.log(dat);
    return dat.data.attributes;
  }
  
  
  


  const processFlight = async(event) => {
    event.preventDefault();
    const printToken = await getAuth(key);
    console.log(printToken);

    const people = document.getElementById("people").value;
    const leg1 = document.getElementById("leg1").value;
    const des1 = document.getElementById("des1").value.toUpperCase();
    const des2 = document.getElementById("des2").value.toUpperCase();

    try{
        const flightData = await getFlight(key, people, des1, des2);
        const distance = (flightData.distance_value * leg1).toFixed(2);
        const carbonEmission = (flightData.carbon_kg * leg1).toFixed(2);
        const list = `
                <div>
                    Carbon Emission for ${leg1} leg, ${people} person, from ${des1} to ${des2}:
                </div>
                <div>
                    Flight Distance: ${distance} km
                </div>
                <div>
                    Carbon Emission: ${carbonEmission} kg
                </div>
                `;
        dataSet.innerHTML = list;  
    }
    catch (error) {
        console.error(error);
        dataSet.innerHTML = `<div class="error">Error, please try again!</div>`;
    };   
  };



  const processGenral = async(event) => {
    event.preventDefault();
    const printToken = await getAuth(key);
    console.log(printToken);

    const weight = document.getElementById("weight").value;
    const leg = document.getElementById("leg2").value;
    const dist = document.getElementById("distance").value;
    const tw = document.getElementById("tw").value.toLowerCase();

    try{
        const generalData = await getGeneral(key, weight, dist, tw);
        const distance = (generalData.distance_value * leg).toFixed(2);
        const carbonEmission = (generalData.carbon_kg * leg).toFixed(2);
        const list = `
                <div>
                    Carbon Emission for ${leg} leg, ${weight} kg, ${distance} km, by ${tw}:
                </div>
                <div>
                    Carbon Emission: ${carbonEmission} kg
                </div>
                `;
        dataSet.innerHTML = list;  
    }
    catch (error) {
        console.error(error);
        dataSet.innerHTML = `<div class="error">Error, please try again! <br> 
        possible errors: invalid input, all text areas must be filled in
        </div>`;
    };   
  };


  const processVehicle = async(event) => {
    event.preventDefault();
    const printToken = await getAuth(key);
    console.log(printToken);

    const dist2 = document.getElementById("distance2").value;
    const leg = document.getElementById("leg3").value; 
    const vm = document.getElementById("vm").value.charAt(0).toUpperCase()
    + document.getElementById("vm").value.slice(1);
    const vn = document.getElementById("vn").value.charAt(0).toUpperCase()
    + document.getElementById("vn").value.slice(1);
    const year = document.getElementById("year").value;

    console.log(vm);
    
    try{
        const vehMakes = await getVehMakes(key);
        console.log(vehMakes);
        const vehMakes_filter = vehMakes.filter(vehicle => vehicle.data.attributes.name === vm);
        console.log(vehMakes_filter);
        const vehMakes_id = vehMakes_filter[0].data.id;
        console.log(vehMakes_id);

        const vehModels = await getCar(key,vehMakes_id);
        console.log(vehModels);
        const vehModels_filter = vehModels.filter(vehicle => vehicle.data.attributes.name === vn 
            && parseInt(vehicle.data.attributes.year) === parseInt(year));
        console.log(vehModels_filter);
        const vehModels_id = vehModels_filter[0].data.id;
        console.log(vehModels_id);

        const vehData = await getVeh(key, vehModels_id, dist2);
        console.log(vehData);
        const distance = (vehData.distance_value * leg).toFixed(2);
        const carbonEmission = (vehData.carbon_kg * leg).toFixed(2);
        const list = `
                <div>
                    Carbon Emission for ${leg} leg, ${distance} km, by ${vm} ${vn} (${year}):
                </div>
                <div>
                    Carbon Emission: ${carbonEmission} kg
                </div>
                `;
        dataSet.innerHTML = list;  
    }
    catch (error) {
        console.error(error);
        dataSet.innerHTML = `<div class="error">Error, please try again!</div>`;
    };   
  };

