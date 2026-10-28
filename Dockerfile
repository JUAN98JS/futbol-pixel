FROM nginx:alpine
COPY index.html three.min.js GLTFLoader.js SkeletonUtils.js meshopt_decoder.js jugador.js estadio.glb balon_trionda.glb balon_rihla.glb balon_etrusco.glb botines.glb /usr/share/nginx/html/
