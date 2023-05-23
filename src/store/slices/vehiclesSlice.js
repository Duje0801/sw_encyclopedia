import { createSlice, current } from "@reduxjs/toolkit";
import Fetching from "../logic/fetching";

const fetchVehicles = Fetching(`fetchVehicles`, `vehicles`);

const vehiclesSlice = createSlice({
  name: `vehicles`,
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchVehicles.fulfilled, (state, action) => {
      return action.payload;
    });
  },
  reducers: {
    deleteVehicle(state, action) {
      const currentState = current(state);
      const newState = currentState.filter((c) => {
        if (c.uid !== action.payload) return c;
        else return;
      });
      localStorage.setItem("vehiclesList", JSON.stringify(newState));
      return newState;
    },
    addVehicle(state, action) {
      const currentState = current(state);
      const newState = [...currentState, action.payload];
      localStorage.setItem("vehiclesList", JSON.stringify(newState));
      return newState;
    },
    editVehicle(state, action) {
      const currentState = current(state);
      const newState = currentState.map((vehicle) => {
        if (vehicle.uid !== action.payload.uid) return vehicle;
        else return action.payload;
      });
      localStorage.setItem("vehiclesList", JSON.stringify(newState));
      return newState;
    },
  },
});

export { vehiclesSlice };
export { fetchVehicles };
export const { deleteVehicle, addVehicle, editVehicle } = vehiclesSlice.actions;
