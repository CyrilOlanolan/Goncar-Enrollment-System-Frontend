import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

/* MUI */
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  SideBar,
  BubblePage,
  InputField,
  FormButton,
} from '../../../../ComponentIndex';
import styles from './EmployeeProfileCreation.module.scss';
import { SEX, MARITAL_STATUS, EMPLOYEE_ROLE, EMPLOYMENT_STATUS } from "../../../../../assets/utilities/constants";

import { useLatestEmployeeID } from '../../../../../assets/utilities/swr';
import { postEmployee } from '../../../../../assets/utilities/axiosUtility';
import { useRoles } from '../../../../../assets/utilities/swr';

const EmployeeProfileCreation = () => {
  const navigate = useNavigate();

  var todayMinusEighteenYears = dayjs().subtract(18, 'year').toDate();
  var todayMinus60Years = dayjs().subtract(60, 'year').toDate();

  /* STATES */
  const [ employeeID, setEmployeeID ] = useState('...')
  const [ firstName, setFirstName ] = useState('');
  const [ middleName, setMiddleName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ sex, setSex ] = useState('Male');
  const [ birthdate, setBirthdate ] = useState(null);
  const [ address, setAddress ] = useState("");
  const [ contact, setContact ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ maritalStatus, setMaritalStatus ] = useState("");
  const [ employeeRole, setEmployeeRole ] = useState("");
  const [ employmentStatus, setEmploymentStatus ] = useState("Active");
  const [ dateHired, setDateHired ] = useState(new Date());
  const [ roleOptions, setRoleOptions ] = useState([]);
  const [ roleMapID, setRoleMapID ] = useState({});

  const [ birthdateErrorProps, setBirthdayErrorProps ] = useState({
    error: false
  })
  const [ dateHiredErrorProps, setDateHiredErrorProps ] = useState({
    error: false
  })

  const SEX_OPTIONS  = [
    SEX.MALE,
    SEX.FEMALE
  ]

  const MARITAL_STATUS_OPTIONS = [
    MARITAL_STATUS.SINGLE,
    MARITAL_STATUS.MARRIED,
    MARITAL_STATUS.WIDOWED,
    MARITAL_STATUS.ANULLED
  ]

  const EMPLOYMENT_STATUS_OPTIONS = [
    EMPLOYMENT_STATUS.ACTIVE,
    EMPLOYMENT_STATUS.INACTIVE
  ]

  // FETCH MAX ID
  const { latestEmployeeID, isLatestEmployeeIDLoading, isLatestEmployeeIDError } = useLatestEmployeeID();

  useEffect(
    () => {
      if (isLatestEmployeeIDError) alert("Error fetching latest employee id! Please refresh or check your internet connection.");
      
      if (!isLatestEmployeeIDLoading) {
        setEmployeeID(latestEmployeeID._max.employeeId + 1)
      }
    }
  , [ latestEmployeeID, isLatestEmployeeIDLoading, isLatestEmployeeIDError ])

  // FETCH ROLES
  const { roles, isRolesLoading, isRolesError } = useRoles();

  useEffect(
    () => {
      if (isRolesError) alert("Error fetching roles! Please refresh or check your internet connection.");
      
      let roleMapID = {} //key: roleName, value: roleId
      let roleNames = [];

      if (!isRolesLoading) {
        for (let role of roles) {
          roleMapID[role.roleName] = role.roleId;
          roleNames.push(role.roleName);
        }
      }
      
      setRoleMapID(roleMapID);
      setRoleOptions(roleNames);
    }
  , [ roles, isRolesLoading, isRolesError ])

  function submitForm(event) {
    event.preventDefault();

    if (birthdate === null) {
      setBirthdayErrorProps({
        error: true,
        helperText: 'Birthdate is required'
      })
    }

    if (dateHired === null) {
      setDateHiredErrorProps({
        error: true,
        helperText: 'Birthdate is required'
      })
    }

    if (birthdate && dateHired) {
      let data = {
          firstName: firstName,
          lastName: lastName,
          birthDay: birthdate,
          sex: sex,
          address: address,
          maritalStatus: maritalStatus,
          emailAdd: email,
          cpNum: contact,
          employeeStatus: employmentStatus,
          dateHired: dateHired,
          roleId: roleMapID[employeeRole]
      }

      if (middleName !== "") {
        data["middleName"] = middleName;
      }

      // console.log(data);
      
      postEmployee(data)
      .then(
        (status) => {
          if (status === 201) {
            navigate(`/employees`);
          }
          else alert(`BAD REQUEST: ${status}`);
        }
      )
    }
  }

  return (
    <>
    <SideBar />
    <BubblePage>
      <h1 className={styles["title"]}>Employee Profile Creation</h1>

      <form className={styles["EmployeeProfileCreation"]} onSubmit={submitForm}>
        <div className="disabled-fields">
          {/* EDIT EMPLOYEE ID HERE */}
          <InputField
            label="Employee ID"
            value={employeeID}
            disabled={true}
            variant={"traineeID"}
            style={{marginLeft: "auto"}} />
        </div>

        <div className={styles["row-1"]}>
          <TextField
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            label="First Name"
            required={true}
            name="firstName"
            id="firstName-input"
            fullWidth={true} />

          <TextField
            value={middleName}
            onChange={e => setMiddleName(e.target.value)}
            label="Middle Name"
            name="middleName"
            id="middleName-input"
            fullWidth={true} />

          <TextField
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            label="Last Name"
            required={true}
            name="lastName"
            id="lastName-input"
            fullWidth={true} />
        </div>

        <div className={styles["row-2"]}>
            <div className={styles["sex"]}>
              <FormControl required>
                <FormLabel id="sex-radio-buttons-group">Sex</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="sex-radio-buttons-group"
                  name="sex-radio-buttons-group"
                  value={sex}
                  onChange={e => setSex(e.target.value)}
                >
                  {SEX_OPTIONS.map((option, index) => {
                    return (
                      <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                    )
                  })}
                </RadioGroup>
              </FormControl>
            </div>

            <div className={styles["bday"]}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  minDate={todayMinus60Years}
                  maxDate={todayMinusEighteenYears}
                  label="Birthdate" 
                  name="birthdate" 
                  value={birthdate}
                  onChange={(newValue) => {
                    setBirthdate(newValue);
                  }}
                  inputFormat="MM/dd/yyyy"
                  openTo="year"
                  renderInput={(params) => <TextField {...params} fullWidth required 
                  {...birthdateErrorProps}/>}
                />
              </LocalizationProvider>
            </div>
        </div>

        <div className={styles["row-3"]}>
          <TextField
            id="address-multiline-static"
            label="Address" 
            name="address"
            multiline
            rows={4}
            value={address}
            onChange={e => setAddress(e.target.value)}
            fullWidth
            required />

          <div className={styles["marital-status-wrapper"]}>
            <FormControl fullWidth required>
              <InputLabel id="maritalStatus-select-label">Marital Status</InputLabel>
              <Select
                labelId="maritalStatus-select-label"
                id="maritalStatus-select"
                name="maritalStatus"
                value={maritalStatus ?? ''}
                label="Marital Status"
                onChange={e => setMaritalStatus(e.target.value)}
              >
                {MARITAL_STATUS_OPTIONS.map((option, index) => {
                  return <MenuItem key={index} value={option}>{option}</MenuItem>
                })}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className={styles["row-4"]}>
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            label="Email"
            name="email"
            placeholder="johndoe@mail.com"
            inputProps={{ inputMode: 'numeric', pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'}}
            type="email"
            fullWidth
            required
          />

          <div className={styles["contact_wrapper"]}>
            <TextField
              value={contact}
              onChange={e => setContact(e.target.value)}
              label="Contact"
              placeholder={"09561234567"}
              name="contact"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
              fullWidth 
              required />
          </div>
        </div>

        <div className={styles["row-5"]}>
          <div className={styles["employee-role-wrapper"]}>
            <FormControl fullWidth required>
              <InputLabel id="employeeRole-select-label">Employee Role</InputLabel>
              <Select
                labelId="employeeRole-select-label"
                id="employeeRole-select"
                name="employeeRole"
                value={employeeRole ?? ''}
                label="Employee Role"
                onChange={e => setEmployeeRole(e.target.value)}
              >
                {roleOptions.map((option, index) => {
                  return <MenuItem key={index} value={option}>{option}</MenuItem>
                })}
              </Select>
            </FormControl>
          </div>

          <div className={styles["date-hired-wrapper"]}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date Hired" 
                name="dateHired" 
                value={dateHired}
                onChange={(newValue) => {
                  setDateHired(newValue);
                }}
                inputFormat="MM/dd/yyyy"
                openTo="year"
                renderInput={(params) => <TextField {...params} fullWidth required 
                {...dateHiredErrorProps}/>}
              />
            </LocalizationProvider>
          </div>

          <div className={styles["employee-status-wrapper"]}>
            <FormControl required>
              <FormLabel id="employmentStatus-radio-buttons-group">Employment Status</FormLabel>
              <RadioGroup
                row
                aria-labelledby="employmentStatus-radio-buttons-group"
                name="employmentStatus-radio-buttons-group"
                value={employmentStatus}
                onChange={e => setEmploymentStatus(e.target.value)}
              >
                {EMPLOYMENT_STATUS_OPTIONS.map((option, index) => {
                  return (
                    <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                  )
                })}
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        <div className={styles["form_buttons"]}>
          <FormButton label="Submit" type="submit" />
          {/* GO BACK TO PREVIOUS PAGE */}
          <FormButton label="Cancel" variant="cancel" type="button" onClick={() => window.history.go(-1)}/>
        </div>

      </form>
    </BubblePage>
    </>
  )
}

export default EmployeeProfileCreation