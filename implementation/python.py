import hashlib
import sys, json

def mapping_sameness_identifier(mapping):
    subjects = "|".join(sorted(mapping["subjects"]))
    objects = "|".join(sorted(mapping["objects"]))
    string = f"{subjects} {mapping['predicate']} {objects}"
    digest = hashlib.sha256(string.encode('utf-8')).hexdigest()
    return f"mapping:~{digest}" if mapping["negativity"] else f"mapping:{digest}"

if __name__ == "__main__":
    mapping = json.load(sys.stdin)
    print(mapping_sameness_identifier(mapping))
