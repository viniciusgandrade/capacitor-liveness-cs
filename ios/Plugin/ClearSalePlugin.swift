import Foundation
import Capacitor
import CSLivenessSDK

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(ClearSalePlugin)
public class ClearSalePlugin: CAPPlugin, CSLivenessDelegate {
    private var livenessSdk: CSLiveness?
    private var permissionCallID: String?

    public func liveness(didOpen: Bool) {
    }

    public func liveness(error: CSLivenessSDK.CSLivenessError) {
        let call = bridge?.savedCall(withID: permissionCallID!);
        call?.reject("Não foi possível validar sua foto.")
    }

    public func liveness(success: CSLivenessSDK.CSLivenessResult) {
        let call = bridge?.savedCall(withID: permissionCallID!);
        call?.resolve([
            "responseMessage": success.real ? "Real" : "False",
            "sessionId": success.sessionId,
            "image": success.image
        ])
    }

    @objc func liveness(_ call: CAPPluginCall) {
        NSLog("======KEY======")
        NSLog(call.getString("keyCS") ?? "")
        self.livenessSdk = CSLiveness(
                                configurations: CSLivenessConfigurations(
                                    clientId: "brbcard",
                                    clientSecret: call.getString("keyCS") ?? ""
                                )
        )
        bridge?.saveCall(call)
        self.permissionCallID = call.callbackId

        DispatchQueue.main.async {
            self.livenessSdk?.delegate = self
            self.livenessSdk?.start(viewController: (self.bridge?.viewController)!, animated: true);
        }
    }
}
