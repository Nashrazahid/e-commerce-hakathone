import shipEngine from "@/sanity/lib/shipEngine";
import { NextRequest, NextResponse } from "next/server";

export async function POST(reQuest:NextRequest) {
  const body = await reQuest.json();
//  console.log("body",body)

 // ismein validation lagani hai aya no thek ya nhi wagera
if(!body.shipToAddress){
  throw new Error("ship to address is required")
}
console.log("Data",body.shipToAddress)
const shipData= await shipEngine.getRatesWithShipmentDetails({
    rateOptions: {
      carrierIds: [process.env.COURIER_ID as string]
    },
    shipment: {
      validateAddress: "no_validation",
      shipTo: body.shipToAddress,
      shipFrom: {
        companyName: "Example Corp.",
        name: "John Doe",
        phone: "111-111-1111",
        addressLine1: "4009 Marathon Blvd",
        addressLine2: "Suite 300",
        cityLocality: "Austin",
        stateProvince: "TX",
        postalCode: "78756",
        countryCode: "US",
        addressResidentialIndicator: "no",
      },
      packages: [
        {
          weight: {
            value: 1.0,
            unit: "ounce",
          },
        },
      ],
    },
  });
 

   console.log("shipdata", shipData)
    // .rateResponse.rates?.[0].rateId);
  const rateId =shipData.rateResponse.rates?.[0].rateId
  if(!rateId){
    throw new Error("rate id not found")
  }
  const labelDetails= await shipEngine.createLabelFromRate({
    rateId:rateId as string
  })
 console.log("label Details",labelDetails.labelId)
  const labelId = labelDetails.labelId
   if(!labelId){
    throw new Error("label id not found")
  }


  const rate = shipData.rateResponse.rates?.[0];
  if (!rate) {
    throw new Error("Rate not found");
  }

  // const labelDetails = await shipEngine.createLabelFromRate({
  //   rateId: rate.rateId,
  // });

  const trackingInfo = await shipEngine.trackUsingLabelId(labelId) 
  // console.log("trackingInfo", trackingInfo);

  return NextResponse.json(
    {trackingNo:trackingInfo.trackingNumber,
    // labelId : labelId,
    labelId: labelDetails.labelId,
    deliveryCharge: rate.shippingAmount.amount,
    currency: rate.shippingAmount.currency,
    estimatedDays: rate.deliveryDays,
    carrier: rate.carrierFriendlyName,
    service: rate.serviceType
  })
}
