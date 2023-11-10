// libraries
import { createSlice } from "@reduxjs/toolkit";



const NAME = "modal";



export const modalSlice = createSlice(
  {
    name: NAME,
    initialState: {
      modalMode: "",
      modalHeading: "",
      modalIsVisible: false,
      previewableIngredient: null,
    },
    reducers: {
      closeModal: state => {
        state.modalIsVisible = false;
      },      
      openOrderModal: state => {
        state.modalMode = "order";
        state.modalHeading = "";
        state.modalIsVisible = true;
      },
      openIngredientModal: (state, action) => {
        state.modalMode = "ingredient";
        state.modalHeading = "Детали ингредиента";
        state.previewableIngredient = action.payload;
        state.modalIsVisible = true;
      }
    }
  }
);

export const { closeModal, openOrderModal, openIngredientModal } = modalSlice.actions;
