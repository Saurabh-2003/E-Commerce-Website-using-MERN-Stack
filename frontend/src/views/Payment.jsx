import React, { Fragment, useEffect, useRef } from "react";
import CheckOutSteps from "../components/cart/CheckOutSteps"
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import {CreditCardIcon, CalendarRange, Shield} from 'lucide-react'
import { createOrder, clearError } from "../slices/orderSlice";
import Loading from "../components/Loading";

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user.user);
  const { error, loading} = useSelector((state) => state.order);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true
      };
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          navigate("/success");
        } else {
          alert("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [dispatch, error, alert]);

  return (
    <main className="min-h-[100svh] bg-gradient-to-tr from-blue-100 to-white grid place-items-center">
      <CheckOutSteps activeStep={2} />
      <div className="h-[400px]  w-[400px] max-sm:h-[300px] max-sm:w-[300px] box-content px-10 py-10  bg-white/50 shadow-sm">
      <h1 className="text-violet-500 text-3xl pb-10 text-center font-serif">Card Details</h1>
      {
        loading ? <Loading /> :
        <form 
      className="flex flex-col gap-10"
         onSubmit={(e) => submitHandler(e)}>
          
          <div className="  relative flex items-center ">
            <CreditCardIcon className="absolute size-10 text-violet-500" />
            <CardNumberElement className="pl-12 w-full py-4 bg-white rounded-lg" />
          </div>
          <div className=" flex relative items-center">
            <CalendarRange className="absolute size-10 text-violet-500"/>
            <CardExpiryElement className="pl-12 w-full py-4 bg-white rounded-lg" />
          </div>
          <div className="relative flex items-center">
            <Shield className="absolute size-10 text-violet-500"/>
            <CardCvcElement  className="pl-12 w-full py-4 bg-white rounded-lg"/>
          </div>

          <input
          className="bg-violet-500 text-white py-2 hover:bg-violet-700 cursor-pointer"
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
          />
        </form>
      }
      </div>
    </main>
  );
};

export default Payment;