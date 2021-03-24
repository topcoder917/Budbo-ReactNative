package com.budbo_rn;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import android.view.MotionEvent;
import com.rome2rio.android.reactnativetouchthroughview.TouchThroughTouchHandlerInterface; 
import com.rome2rio.android.reactnativetouchthroughview.TouchThroughTouchHandler; 

public class MainActivity extends ReactActivity implements TouchThroughTouchHandlerInterface {

  private TouchThroughTouchHandler touchThroughTouchHandler = new TouchThroughTouchHandler();
  
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this, R.style.SplashScreenTheme);  // here
      super.onCreate(savedInstanceState);
  }
  
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "budbo_rn";
  }

  public TouchThroughTouchHandler getTouchThroughTouchHandler() {
      return touchThroughTouchHandler;
  }

  @Override
  public boolean dispatchTouchEvent(MotionEvent ev) {
      touchThroughTouchHandler.handleTouchEvent(ev);

      return super.dispatchTouchEvent(ev);
  }
}
