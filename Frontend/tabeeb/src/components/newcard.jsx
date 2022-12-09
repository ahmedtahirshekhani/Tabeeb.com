import React from "react";
import classNames from "classnames";
// import { View } from 'react-native';
import { BsPlusCircleFill } from "react-icons/bs";
//import { Grid, TextField } from '@material-ui/core';
import { useState } from 'react';

import styles from "../assets/styles/newcard.module.css";
import { loginAuth } from "../services/utils/auth";
import { addAmount } from "../services/utils/wallet";

const Card = ({ amount }) => {
  const [addamount, setAddamount] = React.useState([]);
  const addAmountWallet = ()=>{
    let amount = addamount;
    if (amount === ""){
      const ok = window.confirm("Amount cannot be empty");
      window.location.reload();
      return
    }else if(amount.length > 5){
      const ok = window.confirm("Amount cannot be greater than 5 digits");
      window.location.reload();
      return
    }
    // convert amount to float
    amount = parseFloat(amount);
    if (amount < 0){
      const ok = window.confirm("Amount cannot be negative");
      window.location.reload();
      return
    }
    addAmount(amount).then((res)=>{
      if(res.status === 200){
        if(window.confirm("Amount Added Successfully")){
          window.location.reload();
        }
      }
    })
    .catch((err)=>{
      console.log(err);
    }
    )
    
  }
  return (
    <div className={classNames([styles.wrapper, styles.wrapperAnime])}>
      <div className={styles.textWrapper} >
        {/* <TextField id="outlined-basic" label="Add Amount" variant="outlined" /> */}
        <br />
        <h1 className={styles.text}>{`Balance: ${amount}`}</h1>
        
      </div>

      {/* <TextField  id="outlined-basic" label="Amount" variant="outlined" /> */}
      <div className="form-control">
					<label className="label">
						<span className="label-text text-black">Deposit Amount</span>
					</label>
					<input
						// type="password"
						placeholder="Amount"
						className="input input-bordered"
            type="number"
						onChange={(e) => setAddamount(e.target.value)}
					/>
				</div>


      <div class="col-auto" style={{ paddingTop: '15px' }}>
          <button type="submit" class="btn btn-primary mb-3" onClick={()=>addAmountWallet()}>Add Amount <BsPlusCircleFill />
      </button>
             
       </div>
      
    </div>
  );
};

export default Card;