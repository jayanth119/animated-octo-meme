mkdir -p scratch/esm-test
cd scratch/esm-test
cat << 'JS' > server.js
import app from './app.js';
console.log('in server.js', app);
export const io = 'io';
JS
cat << 'JS' > app.js
import { io } from './routes.js';
export default 'app_export';
JS
cat << 'JS' > routes.js
import { io } from './server.js';
export { io };
JS
node server.js
