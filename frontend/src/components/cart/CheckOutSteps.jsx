import { Truck, Package, Landmark, CheckCircle2 } from 'lucide-react';

const CheckOutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <h1>Shipping</h1>,
      icon: <Truck />,
    },
    {
      label: <h1>Confirm </h1>,
      icon: <Package />,
    },
    {
      label: <h1>Payment</h1>,
      icon: <Landmark />,
    },
  ];

  return (
    <section className="w-[70%] mx-auto pt-20  ">
      <div className="flex justify-between">
        {steps.map((item, index) => (
          <div key={index} className={`flex ${index === activeStep && `px-2 py-2 bg-violet-500 rounded-lg text-white`}  relative flex-col items-center gap-1 ${index < activeStep && ' text-violet-500'}`}>
            {item.icon}
            {item.label}
            <CheckCircle2 className={`  ${index < activeStep ? `absolute top-0 right-0` : 'hidden'}`} size={15} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CheckOutSteps;
