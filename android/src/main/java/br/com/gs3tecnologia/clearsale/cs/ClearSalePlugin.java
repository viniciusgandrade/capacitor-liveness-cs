package br.com.gs3tecnologia.clearsale.cs;

import android.content.Intent;
import android.util.Log;

import androidx.activity.result.ActivityResult;

import com.clear.studio.csliveness.core.CSLiveness;
import com.clear.studio.csliveness.core.CSLivenessResult;
import com.clear.studio.csliveness.view.CSLivenessActivity;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "ClearSale")
public class ClearSalePlugin extends Plugin {

    @PluginMethod
    public void liveness(PluginCall call) {
        String secret = call.getString("keyCS");
        CSLiveness mCSLiveness = new CSLiveness("brbcard", secret);
        Intent mIntent = new Intent(this.getContext(), CSLivenessActivity.class);
        mIntent.putExtra(CSLiveness.PARAMETER_NAME, mCSLiveness);

        startActivityForResult(call, mIntent, "pickImageResult");
    }

    @ActivityCallback
    private void pickImageResult(PluginCall call, ActivityResult result) {
        if (call == null) {
            return;
        }
        Intent data = result.getData();
        JSObject res = new JSObject();
        if (data != null) {
            CSLivenessResult mCSLivenessResult = (CSLivenessResult) data.getSerializableExtra(CSLiveness.PARAMETER_NAME);
            Log.d("RESPOSTA",mCSLivenessResult.getResponseMessage());
            String sessionId = mCSLivenessResult.getSessionId();
            String responseMessage = mCSLivenessResult.getResponseMessage();
            String image = mCSLivenessResult.getImage();
            res.put("responseMessage", responseMessage);
            res.put("sessionId", sessionId);
            res.put("image", image);
            if (sessionId != null) {
                call.resolve(res);
            } else {
                call.reject("Não foi possível validar sua foto.");
            }
        } else {
            call.reject("Não foi possível validar sua foto.");
        }
    }

}

