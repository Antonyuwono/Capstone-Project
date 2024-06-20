const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ['Tugu Yogyakarta', 'candi Prambanan', 'candi ratu boko', 'benteng Vredeburg', 'monumen Jogja kembali'];

    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const label = classes[classResult];
    

    let explanation, suggestion, url;

    if (label === 'Tugu Yogyakarta') {
      explanation = 'Tugu Yogyakarta is an important historical pillar landmark in the city of Yogyakarta, Indonesia. Tugu means monument'
      suggestion = "Suksess"
      url = "https://storage.googleapis.com/deteksi-tempat-bersejarah/dataset_foto_model/tugu_1.jpg"
    }
    
    if (label === 'candi Prambanan') {
      explanation = 'Prambanan is a 9th-century Hindu temple compound in the Special Region of Yogyakarta, in southern Java, Indonesia'
      suggestion = "Suksess"
      url = "https://storage.googleapis.com/deteksi-tempat-bersejarah/dataset_foto_model/pexels-charldurand-6488410.jpg"
    }
    if (label === 'candi ratu boko') {
      explanation = 'Ratu Boko or Ratu Boko Palace is an archaeological site in Java. Ratu Boko is located on a plateau, about three kilometres south of Prambanan temple complex in Yogyakarta, Indonesia'
      suggestion = "Suksess"
      url = "https://storage.googleapis.com/deteksi-tempat-bersejarah/dataset_foto_model/candi_ratu_boko_1.JPG"
    }
    
    if (label === 'benteng Vredeburg') {
      explanation = 'Fort Vredeburg Museum was a former colonial fortress located in the city of Yogyakarta, Special Region of Yogyakarta, Indonesia'
      suggestion = "Suksess"
      url = "https://storage.googleapis.com/deteksi-tempat-bersejarah/dataset_foto_model/benteng_vredebeurgh.jpg"
    }

    if (label === 'monumen Jogja kembali') {
      explanation = 'Monumen Yogya Kembali, known colloquially as Monjali, is a pyramid-shaped museum dedicated to the Indonesian National Revolution located in the Ngaglik sub-district, Sleman, Special Region of Yogyakarta, Indonesia.'
      suggestion = "Suksess"
      url =  "https://storage.googleapis.com/deteksi-tempat-bersejarah/dataset_foto_model/monumen_jogja_kembali_1.jpg"
    }

    return { confidenceScore, label, explanation, suggestion, url };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;
