import { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Dropdown() {
  const [value, setValue] = useState('customer');
  const [signup, setSignup] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  return (
    <div className='flex items-start  justify-start lg:translate-x-20'>
    
<div className='mt-16 rounded self-center  flex flex-col justify-center gap-y-4 items-center p-10 md:translate-x-40 bg-gradient-to-b from-purple-300/40 to-purple-300/20 shadow'>
<p className="text-4xl text-center mb-4"> { signup ? "Sign Up" : "Login"}</p>
    
<div className='rounded  flex justify-end  items-baseline h-14  w-80 outline outline-1 outline-slate-500  '>
    <p className='text-lg text-gray-600 mr-10 pr-3 '>User Type</p>
    <Select className='h-14 w-44 ' 
      value={value}
      onChange={handleChange}
    >
      <MenuItem  value="customer">Customer</MenuItem>
      <MenuItem value="engineer">Engineer</MenuItem>
    </Select>
    </div>
<TextField className='h-14 w-80  ' id="outlined-basic" label="User Id" variant="outlined" />
{ signup &&  <TextField className='h-14 w-80 ' id="outlined-basic" label="Username" variant="outlined" />}
 { signup && <TextField className='h-14 w-80 ' id="outlined-basic" label="Email" variant="outlined" />} 
<TextField className='h-14 w-80 '
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
    
    <Button className='h-12 w-40' variant="contained">{ signup ? "Sign Up" : "Login"}</Button>
    <p onClick={()=> setSignup(!signup)} className='text-lg text-blue-700 hover:text-blue-800 -translate-y-1 text-center'> {signup ?  "Already have an account? Login" : "Don't have an account? Sign Up"}</p>
    </div>
    </div>
  );
}

export default Dropdown;
