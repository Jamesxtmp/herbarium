/* eslint-disable react/prop-types */
export default function PlantPrewCard ( { plant } ) {
  console.log( "item", plant.name );

  const { name, description, scientific_name, properties } = plant

  return (
    <div style={{ display: "flex", backgroundColor: "#D8EFD3", padding: "8px", margin: "0 4px 8px 4px", borderRadius: "8px", width: "600px", maxWidth: "90vw" }}>
      <div>
        <img
          style={{ width: '150px', borderRadius: '16px', marginRight: "8px" }}
          src="https://ognhpnlmvmxlyzqlyolv.supabase.co/storage/v1/object/public/james/IMG_20241001_150044236%20(Custom).jpg"
          alt={`Imagen de: ${name}`} />
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      >
        <div>
          <div>
            <span style={{ fontSize: "1.4em", fontWeight: "bold" }}>{name}</span>
          </div>
          <div>
            <span style={{ fontSize: ".8em", position: "relative", bottom: 8 }} >{scientific_name}</span>
          </div>
          <div>
            <span style={{ fontSize: "1em", fontWeight: "bold" }}>Descripción: </span><br />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }} >{description}</span>
          </div>
        </div>
        <div>
          <span style={{ fontSize: "1em", fontWeight: "bold", marginBottom: "10px" }}>Propiedades: </span>
          {
            properties.map( ( propiedad, i ) =>
              <span style={{ backgroundColor: "#55AD9B", color: "#fff", padding: "2px 4px", borderRadius: "8px", marginRight: "4px", fontSize: ".8em" }} key={i} >{propiedad}</span>
            )
          }
        </div>
      </div>
    </div>
  )
}





