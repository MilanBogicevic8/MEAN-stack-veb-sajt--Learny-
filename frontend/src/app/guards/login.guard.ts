import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  if(
    localStorage.getItem("user")!=null
  ) return false;
  else {
    //alert("Nije Vam dozvoljen pristup bez logovanja")
    return true;
  }
};
