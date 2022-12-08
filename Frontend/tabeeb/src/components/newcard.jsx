import React from "react";
import classNames from "classnames";
// import { View } from 'react-native';
import { BsPlusCircleFill } from "react-icons/bs";
import { Grid, TextField } from '@material-ui/core';
import { useState } from 'react';

import styles from "../assets/styles/newcard.module.css";
import { loginAuth } from "../services/utils/auth";

const Card = ({ amount }) => {
  const [addamount, setAddamount] = React.useState([]);
  return (
    <div className={classNames([styles.wrapper, styles.wrapperAnime])}>
      <div className={styles.textWrapper} >
        {/* <TextField id="outlined-basic" label="Add Amount" variant="outlined" /> */}
        <br />
        <h1 className={styles.text}>{`TOTAL AMOUNT: ${amount}`}</h1>
        
      </div>

      {/* <TextField  id="outlined-basic" label="Amount" variant="outlined" /> */}
      <div className="form-control">
					<label className="label">
						<span className="label-text">Amount</span>
					</label>
					<input
						// type="password"
						placeholder="Amount"
						className="input input-bordered"
						onChange={(e) => setAddamount(e.target.value)}
					/>
				</div>


      <div class="col-auto" style={{ paddingTop: '15px' }}>
          <button type="submit" class="btn btn-primary mb-3" >Add Amount <BsPlusCircleFill />
      </button>
             
       </div>
      
    </div>
  );
};

export default Card;