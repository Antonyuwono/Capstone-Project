const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    class L2 {

        static className = 'L2';
            
        constructor(config) {
           return tf.regularizers.l1l2(config)
        }
        }
        tf.serialization.registerClass(L2);
    return tf.loadLayersModel(process.env.MODEL_URL);
}

module.exports = loadModel;


