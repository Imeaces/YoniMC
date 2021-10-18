class Vector {

      constructor(x=0, y=0, z=0){
            this.x = x;
            this.y = y;
            this.z = z;
      }

      static composite(vec1, vec2) {
            const {x, y, z} = vec1;
            const {x1, y1, z1} = {x1:vec2.x, y1:vec2.y, z1: vec2.z};
            return new Vector(x+x1, y+y1, z+z1);
      }

      composite(vec1, vec2) {
            
            if (vec2) return Vector.composite(vec1, vec2);

            const {x, y, z} = vec1;
            this.x += x;
            this.y += y;
            this.z += z;

            return this;

      }

      static dotProduct(vec1, vec2) {
            const {x, y, z} = vec1;
            const {x1, y1, z1} = {x1:vec2.x, y1:vec2.y, z1: vec2.z};
            return x*x1 + y*y1 + z*z1;
      }

      dotProduct(vec1, vec2) {
            if (vec2) return Vector.dotProduct(vec1, vec2);
            return Vector.dotProduct(this, vec1);
      }

      static crossProduct(vec1, vec2) {

            const {x,   y,    z} = vec1;
            const {x1, y1, z1} = {x1:vec2.x, y1:vec2.y, z1: vec2.z};

            return new Vector(y*z1-z*y1, z*x1-x*z1, x*y1-y*x1);
      }

      crossProduct(vec1, vec2) {
            if (vec2) return Vector.crossProduct(vec1, vec2);

            const {x,   y,    z} = this;
            const {x1, y1, z1} = {x1:vec2.x, y1:vec2.y, z1: vec2.z};

            this.x = y*z1-z*y1;
            this.y = z*x1-x*z1;
            this.z = x*y1-y*x1;

            return this;
      }

      static fromPolar(dx, dy, r) {
            let z = Math.sin(dy) * r,
            projection = Math.cos(dy) * r,
            x = Math.cos(dx) * projection,
            y = Math.sin(dx) * projection;

            return new Vector(x, y, z);
      }

      toPolar() {
            let projection = Math.sqrt(this.x**2 + this.y**2),
            dy = Math.atan(this.z/projection),
            r = Math.sqrt(this.z**2 + projection**2),
            dx = Math.atan(this.y/this.x);

            return {dx, dy, r};
      }

}

class Impulse extends Vector {

      constructor(x=0, y=0, z=0, mess=Infinity) {
            super(x, y, z);
            this.mess = mess;
      }

      static rebound(impulse, axios) {
            const {x, y, z} = impulse;

            return axios == 'z'? new Impulse(x, y, -z):
                  axios == 'y'? new Impulse(x, -y, z):
                        axios == 'x'? new Impulse(-x, y, z): null;
      }

      rebound(axios, impulse) {
            if (impulse) return Impulse.rebound(impulse, axios);
            axios == 'x'? this.x = -this.x:
                  axios == 'y'? this.y = -this.y:
                        axios == 'z'? this.z = -this.z: null;
            
            return this;
      }

}

export {Impulse};