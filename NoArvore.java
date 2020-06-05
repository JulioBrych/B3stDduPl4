//Martha Lanser Bloemer e Julio Vicente Brych
public class NoArvore<T> {

    private T info;
    private NoArvore<T> filho;
    private NoArvore<T> irmao;

 
    public NoArvore(T info) {
        this.info = info;
    }
 
    public T getInfo() {
		return info;
	}

	public void setInfo(T info) {
		this.info = info;
	}

	public void inserirFilho(NoArvore<T> novo) {
        novo.irmao = this.filho;
        this.filho = novo;
    }

 
    public NoArvore<T> pertence(T info) {
        if (this.info.equals(info)) {
            return this;
        }
        NoArvore<T> no;
        if (this.filho != null) {
        	no = filho.pertence(info);
        	if (no != null) {
        		return no;
        	}
        }
        if (this.irmao != null) {
            return irmao.pertence(info);
        }
        return null;
    }

    public String imprimePre() {
        String str = "<" + this.info;
        if (this.filho != null) {
            str += filho.imprimePre();
        }
        str += ">";
        if (this.irmao != null) {
            str += irmao.imprimePre();
        }
        return str;
    }
    
    public int getAltura() {
    	int altura = 0;
    	if (this.filho != null) {
    		altura++;
    		altura += filho.getAltura();
    	}else if (this.irmao != null) {
    		altura += irmao.getAltura();
    	}	
    	return altura;
    }
    
    public int getNivel(T info) {
    	int nivel = 0;
    	if(this.info.equals(info)) {
    		return 1;
    	}
    	if(this.filho != null) {
    		if(filho.getNivel(info) > 0) {
    			nivel += filho.getNivel(info)+1;
    		}
    	}
    	if(this.irmao != null) {
    		nivel += irmao.getNivel(info);
    	}
    	return nivel;
    }
    
    public boolean isBalanceada(NoArvore<T> no) {
    	int filhoAltura = 0;
        int irmaoAltura = 0; 
        if (no == null) {
            return true;
        }
        if(this.filho != null) {
        	filhoAltura = this.filho.getAltura();
        }
        if(this.irmao != null) {
        	irmaoAltura = this.irmao.getAltura(); 
        }
        if (isBalanceada(no.filho) && isBalanceada(no.irmao) && Math.abs(filhoAltura - irmaoAltura) <= 1) {
            return true;
        }
        return false; 
    }

 }