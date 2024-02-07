import  { useEffect } from 'react'
import Chart from "chart.js/auto";
import {Doughnut, Line} from 'react-chartjs-2'

const AdminDashboard = () => {
  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: 'purple',
        hoverBackgroundColor: 'purple',
        data: [0, 4000],
      },
    ],
  };
  
  const lineOptions = {
    scales: {
      x: {
        type: 'category', 
      },
    },
  };
  

  const doughnutState = {
    labels:['Out of Stock', 'In Stock'],
    datasets: [
      {
        backgroundColor:['#731DD8', '#48A9A6'],
        hoverBackgroundColor:['#b0a4dd', '#E4DFDA'],
        data:[2, 10]
      }
    ]
  }

  return (
    <section className='h-[85svh] rounded-lg overflow-y-scroll flex flex-col w-4/5 max-md:w-full bg-white'>
        <div className='flex flex-col'>
            <h1 className='w-full h-20 px-10 py-2 text-white text-center text-2xl font-serif bg-violet-500'><p>Total Amount</p> ₹4000</h1>
            <div className='flex justify-around text-white  text-xl font-mono mt-10 flex-wrap h-36'>
                <div className='flex flex-col items-center justify-center  bg-[#909dc6fb] w-36  text-ellipsis rounded-full'>Products <p>10000</p></div>
                <div className='flex flex-col items-center justify-center bg-[#b0a4dd] w-36 rounded-full'>Users <p>9987</p></div>
                <div className='flex flex-col items-center justify-center w-36  bg-[#e7cfa5] rounded-full'>Orders <p>908790</p></div>
            </div>
        </div>

        <div className='w-[80%] py-12 mx-auto'>
            <Line data={lineState} />
        </div>

        <div className=' py-12 mx-auto'>
            <Doughnut data={doughnutState} />
        </div>

    </section>
  )
}

export default AdminDashboard