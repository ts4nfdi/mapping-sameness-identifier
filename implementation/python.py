import hashlib, base64
import sys, json

def mapping_sameness_identifier(mapping):
    subjects = "|".join(sorted(mapping["subjects"]))
    objects = "|".join(sorted(mapping["objects"]))
    string = f"{subjects} {mapping['predicate']} {objects}"

    print(string)
    sha = hashlib.sha256(string.encode('utf-8'))
    print(sha.hexdigest())
    id = base64.urlsafe_b64encode(sha.digest()).decode('ascii').rstrip('=')
    return f"mapping:~{id}" if mapping["negative"] else f"mapping:{id}"

if __name__ == "__main__":
    mapping = json.load(sys.stdin)
    print(mapping_sameness_identifier(mapping))
