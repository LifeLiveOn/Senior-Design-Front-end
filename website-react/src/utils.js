import { BACKEND_URL } from "./constants";

export async function updateHouseReport(data, houseId) {
    // Estimations ----------------------------------------------------------------
    const viewingAngle = 33.0;
    const imageWidth = 640.0;
    const distance = 16.0;
    const rooftype = "Asphalt Shingles";

    const footToPixel = (2 * distance * Math.tan(viewingAngle / 2)) / imageWidth;

    // Material cost
    let materialCostPerSqrFt = 1;
    let labourCostPerSqrFt = 1;
    if (rooftype === "Asphalt Shingles")
    {
        materialCostPerSqrFt = 1.1;
        labourCostPerSqrFt = 2.75;
    }
    else if (rooftype === "Metal")
    {
        materialCostPerSqrFt = 11;
        labourCostPerSqrFt = 6.00;
    }

    let area = 0;
    let damageTypes = [];
    let count = 0;
    for (const result of data.results)
    {
        if (result.detections === null)
            continue;

        // Gets total damage area
        for(const box of result.detections.boxes)
        {
            let width = (box[2] - box[0]) * footToPixel;
            let height = (box[3] - box[1]) * footToPixel;
            area += width * height;
        }

        // Gets damage types
        for (const label of result.detections.labels)
        {
            let type = "hail";
            if (label === 0)
                type = "wind";
            
            if (!damageTypes.includes(type))
                damageTypes.push(type);
        }

        count++;
    }

    // Severity estimate
    let severity = 0;
    if (area > 800)
        severity = 5;
    else if (area > 600)
        severity = 4;
    else if (area > 400)
        severity = 3;
    else if (area > 200)
        severity = 2;
    else if (area > 0)
        severity = 1;

    // Cost estimate
    const roofCost = area * materialCostPerSqrFt;
    const labourCost = area * labourCostPerSqrFt;
    const totalCost = roofCost + labourCost;

    console.log("-Details-", "\nArea: \t\t\t" + area, "\nSeverity: \t\t" + severity, "\nDamage Types: \t" + damageTypes);
    console.log("-Cost-" + "\nRoof Cost: \t\t" + roofCost, "\nLabor Cost: \t" + labourCost, "\nTotal Cost: \t" + totalCost.toFixed(2));
    
    //-----------------------------------------------------------------------------

    const formData = new FormData();
    formData.append("severity", severity);
    formData.append("damage_types", JSON.stringify(damageTypes));
    formData.append("price_estimate", totalCost.toFixed(2));

    try {
        const res = await fetch(BACKEND_URL + "/api/v1/houses/" + houseId + "/", {
            method: "PATCH",
            credentials: "include",
            body: formData
        });

        if (!res.ok || res == null)
            throw new Error(res.status);

        const data = await res.json();
        
        console.log(data);
    }
    catch (err) {
        console.log("Error: ", err);
        alert(err);
    }
}

export async function generateReport(formData, houseId) {
    try {
        const res = await fetch(BACKEND_URL + "/api/houses/" + houseId + "/run_prediction/", { //https://backend-42686524573.europe-west1.run.app/api/houses/" + houseId + "/run_prediction/
            method: "POST",
            credentials: "include",
            body: formData
        });

        if (!res.ok || res == null)
            throw new Error(res.status);

        const data = await res.json();
        
        console.log(data);

        return data;
    }
    catch (err) {
        console.log("Error: ", err);
        alert(err);
    }
}