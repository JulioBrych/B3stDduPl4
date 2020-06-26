package ordenacao;

public class Selection<T> implements Sort{

	

	@Override
	public void sort(Comparable[] vetor) {

        int n = vetor.length; 
  
        
        for (int i = 0; i < n-1; i++) 
        { 
           
            int min_idx = i; 
            for (int j = i+1; j < n; j++) 
                if (vetor[j].compareTo(vetor[min_idx]) <0) 
                    min_idx = j; 

            Comparable temp = vetor[min_idx]; 
            vetor[min_idx] = vetor[i]; 
            vetor[i] = temp; 
        } 

		
	}

}
