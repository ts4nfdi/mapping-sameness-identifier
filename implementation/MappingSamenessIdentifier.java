//DEPS com.fasterxml.jackson.core:jackson-databind:2.15.2
//DEPS commons-codec:commons-codec:1.16.0
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.codec.digest.DigestUtils;

import java.util.Arrays;
import java.util.Comparator;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class MappingSamenessIdentifier {
  public static void main(String[] args) throws Exception {
    JsonNode mapping = new ObjectMapper().readTree(System.in);
    String elements = joinSorted(mapping.get("subjects")) + " "
                    + mapping.get("predicate").asText() + " "
                    + joinSorted(mapping.get("objects"));
    System.out.println("mapping:" 
                    + DigestUtils.sha256Hex(elements)
                    + (mapping.path("negativity").asBoolean() ? "~" : ""));
  }

  private static String joinSorted(JsonNode arrayNode) {
    return StreamSupport.stream(arrayNode.spliterator(), false)
      .map(JsonNode::asText)
      .sorted(Comparator.comparing(s -> s.codePoints().toArray(), Arrays::compare))
      .collect(Collectors.joining("|"));        
  }
}
