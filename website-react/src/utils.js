async function updateHouseReport(data) {
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
    for (const result of data.results)
    {
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
    }
}