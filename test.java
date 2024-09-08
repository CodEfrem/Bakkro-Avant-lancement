import com.altirnao.aodocs.custom.*;
import com.aodocs.google.api.services.sheets.v4.model.ValueRange;
import java.util.List;
import java.util.regex.*;

class test {
    public void execute(ReadableDocument document) throws Exception {
        // Récupération des valeurs des champs du document
        String spreadsheetId = document.getFields().getFieldByName("SpreadsheetId").getValue() + "";
        String targetClassName = document.getFields().getFieldByName("Target class").getValue() + "";
        String targetSearchField = document.getFields().getFieldByName("Target search field").getValue() + "";
        long currentIndex = 1;

        // Initialisation des services et des patterns nécessaires
        DocumentService documentService = getDocumentService();
        Pattern INT_PATTERN = Pattern.compile("-?(\\d+[ ]*)+");

        /*
        Pattern INT_PATTERN = Pattern.compile("-?(\\d+[ ]*)+"); : Cette ligne initialise un pattern (Pattern) 
        qui sera utilisé pour vérifier si une chaîne correspond à un nombre entier. 
        Le pattern "-(\\d+[ ]*)+" recherche des séquences de chiffres 
        (\\d+) éventuellement précédées d'un signe négatif (-) et suivies de zéros ou plusieurs espaces ([ ]*). 
        Cette expression régulière permet de détecter les nombres entiers, même s'ils sont séparés par des espaces.
        Ensemble, ces initialisations fournissent les outils nécessaires pour manipuler 
        les données extraites de la feuille de calcul et les stocker dans les documents de manière appropriée.
         */

        // Récupération des données de la feuille de calcul à partir de la ligne
        // spécifiée
        ValueRange valueRange = (ValueRange) getSheetsApiV4().values()
                .get(spreadsheetId, String.format("A%d:D", currentIndex)).execute();
        List<List<Object>> values = valueRange.getValues();

        // Vérification si la feuille de calcul est vide ou non trouvée
        if (values == null) {
            info("spreadsheet empty or not found");
            return;
        }

        // Extraction des noms de champs de la première ligne de la feuille de calcul
        List<Object> targetFields = (List<Object>) values.remove(0);

        // Recherche de l'index de la colonne correspondant au champ de recherche cible
        int indexTargetSearchField = 0;
        for (int i = 0; i < targetFields.size(); i++) {
            String field = (String) targetFields.get(i);
            if (field.equals(targetSearchField)) {
                indexTargetSearchField = i;
                break;
            }
        }

        // Parcours des lignes restantes pour créer et stocker de nouveaux documents
        for (List<Object> row : values) {
            // Création d'un nouveau document avec la classe cible spécifiée
            Document newDoc = documentService.createDocument(targetClassName, "");
            // Parcours des colonnes de chaque ligne pour remplir les champs du nouveau
            // document
            for (int i = 0; i < targetFields.size(); i++) {
                String cell = row.get(i) + "";
                // Vérification si la cellule contient un nombre entier
                if (INT_PATTERN.matcher(cell).matches()) {
                    // Suppression des espaces dans la cellule et conversion en entier
                    cell = cell.replaceAll(" ", "");
                    newDoc.setField(targetFields.get(i) + "", Integer.parseInt(cell));
                } else {
                    // Sinon, stockage de la valeur de la cellule telle quelle
                    newDoc.setField(targetFields.get(i) + "", cell);
                }
            }
            // Stockage du nouveau document
            documentService.store(newDoc);
        }
        // explique moi se script avec l'objectif et les fonctionalité, renvoie le moi
        // commenté
    }
}

// AppScript pour supprimer
// AppScript pour vider toute la ligne
// Spreadsheet gerer la 
// l'unicité par numéro attestion