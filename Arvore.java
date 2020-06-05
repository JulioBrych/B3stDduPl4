//Martha Lanser Bloemer e Julio Vicente Brych
public class Arvore<T> {

    private NoArvore<T> raiz;
    
    public void setRaiz(NoArvore<T> raiz) {
        this.raiz = raiz;
    }

    public NoArvore<T> pertence(T info) {
        if (this.vazia()) {
            return null;
        } else {
            return this.raiz.pertence(info);
        }
    }

    public boolean vazia() {
        return (this.raiz == null);
    }

    public String toString() {
        if (this.vazia()) {
            return "";
        }
        return this.raiz.imprimePre();
    }
    
    public int getAltura() {
    	int altura = 0;
    	if (this.raiz != null) {
    		altura += raiz.getAltura();
    	}else {
    		altura = -1;
    	}
    	return altura;
    }
    
    public int getNivel(T info) {
    	int nivel = 0;
    	if (this.raiz != null) {
    		nivel = raiz.getNivel(info);
    		return nivel-1;
    	}
    	return nivel-1;
    }
    
    public boolean isBalanceada() {
    	if(raiz == null) {
    		return true;
    	}
    	
    	return raiz.isBalanceada(raiz);
    }
    
    
}
